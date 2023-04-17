export class CleanOffensiveWords{
  public cleanOffensiveWords(offensiveTerms: string[], text: string): string{

    if (offensiveTerms == null || offensiveTerms.length == 0){
      return text;
    }

    let manipulatedText = text

    for(const term of offensiveTerms){
      manipulatedText = manipulatedText.replace(term, "*****" )
    }
    return manipulatedText
  }
}