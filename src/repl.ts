export function cleanInput(input: string): string[] {
    // Trim leading and trailing spaces
    let trimText = input.trim();

    // Split the input into an array of words, using spaces as the delimiter
    let result = trimText.split(/[;,]\s*|\s+/)

    // Trim any extra spaces at the end of each word
    //let cleanWords = words.map(word => word.trim());

    return result;
}