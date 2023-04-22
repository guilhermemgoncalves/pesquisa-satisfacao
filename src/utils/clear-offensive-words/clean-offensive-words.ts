export class CleanOffensiveWords{
  public cleanOffensiveWords(OffensiveWords: string[], text: string): string{

    if (OffensiveWords == null || OffensiveWords.length == 0){
      return text;
    }

    let manipulatedText = text

    for(const term of OffensiveWords){
      manipulatedText = manipulatedText.replace(term, "*****" )
    }
    return manipulatedText
  }
}