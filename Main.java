import java.util.*;

// Main class
class Main {
  // Method to calculate FOIL gain
  static double foilGain(Rule rule, Literal predicate, List<Tuple> positiveData,
      List<Tuple> negativeData) {

    Rule newRule = new Rule(rule);
    newRule.addLiteralToBody(predicate);

    // Count positive and negative examples before adding the literal
    int P = 0;
    int N = 0;
    int p = 0;
    int n = 0;
    int t = 0;
    for (Tuple tuple : positiveData) {
      if (rule.coversExample(tuple)) {
        P++;
      }
      if (newRule.coversExample(tuple)) {
        p++;
      }

      if (rule.coversExample(tuple) && newRule.coversExample(tuple)) {
        t++;
      }
    }

    for (Tuple tuple : negativeData) {
      if (rule.coversExample(tuple)) {
        N++;
      }
      if (newRule.coversExample(tuple)) {
        n++;
      }
    }

    // Compute FOIL gain
    double gain = 0;
    if (p > 0 && P > 0) { // to avoid division by zero and log of zero
      gain = t * (Math.log((double) p / (p + n)) - Math.log((double) P / (P + N)));
    }

    // Remove the new literal from the rule to keep it as it was before calling this
    // method
    rule.removeLiteralFromBody((Literal) predicate);

    return gain;
  }

  // Method to implement FOIL algorithm
  static Rule foil(List<Tuple> positiveData, List<Tuple> negativeData, Literal target,
      Set<Literal> allPredicates, int ruleLength) {
    Rule rule = new Rule();
    rule.setHead(target);

    while (true) {
      Literal bestLiteral = null;
      double bestGain = -1;

      for (Literal literal : allPredicates) {
        double gain = foilGain(rule, literal, positiveData, negativeData);
        if (gain > bestGain) {
          bestGain = gain;
          bestLiteral = literal;
        }
      }

      if (bestGain <= 0) {
        break;
      }

      rule.addLiteralToBody(bestLiteral);
      allPredicates.remove(bestLiteral);

      if (!rule.coversExamples(negativeData) || rule.getBody().size() == ruleLength) {
        break;
      }
    }

    // Remove positive examples covered by the rule
    Iterator<Tuple> iterator = positiveData.iterator();
    while (iterator.hasNext()) {
      Tuple tuple = iterator.next();
      if (rule.coversExample(tuple)) {
        iterator.remove();
      }
    }

    return rule;
  }

  // Main method
  public static void main(String[] args) {
    DataSet data = new DataSet(args[0]);

    Literal target = new Literal(args[1], Integer.parseInt(args[2]), 
    Arrays.asList(Arrays.copyOfRange(args,3, args.length)));

    List<Tuple> positiveData = data.loadPositiveData(target);
    List<Tuple> negativeData = data.loadNegativeData(target);
    Set<Literal> allPredicates = data.loadPredicates();

    allPredicates.remove(target);

    int counter = 0;
    while (!positiveData.isEmpty()) {
      Rule rule = foil(positiveData, negativeData, target, allPredicates, 4);
      System.out.println(rule + "\n");
      counter++;
      if (counter == 5)
        break;
    }
  }
}
