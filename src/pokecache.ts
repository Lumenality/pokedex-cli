export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval:number){
    this.#interval = interval;

    this.#startReapLoop(); 

  }

  add<T>(key:string,val:T) {
    this.#cache.set( key, {
        createdAt: Date.now(),
        val: val
    });
    
  }

  get<T>(key:string):T|undefined {
    const entry = this.#cache.get(key);
    if (entry === undefined) {
        return undefined;
    }
    return entry.val;

  }

  #reap(){
    const now = Date.now();
    const cutoffTime = now - this.#interval;
    for (const [key, entry] of this.#cache.entries()) {
        // If the entry was created BEFORE the cutoff time, it's expired
        if (entry.createdAt <= cutoffTime) {
            this.#cache.delete(key);
        }
    }
  }

  #startReapLoop(){
    this.#reapIntervalId = setInterval(() => {
        this.#reap();
    }, this.#interval);

    // Node.js specific optimization: prevents the cache from holding the process open
    if (this.#reapIntervalId && typeof this.#reapIntervalId === 'object' && 'unref' in this.#reapIntervalId) {
      this.#reapIntervalId.unref();
    }
  }

  stopReapLoop(){
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
};