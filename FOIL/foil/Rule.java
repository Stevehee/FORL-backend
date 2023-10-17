package foil;
import java.util.*;

// Class for a rule
class Rule {
  List<Literal> body;
  Literal head;
  Double prob; 

  public Rule() {
    body = new ArrayList<>();
  }

  public Rule(Rule original) {
    this.head = original.head;
    this.body = new ArrayList<>(original.body);
  }

  public void setHead(Literal head) {
    this.head = head;
  }

  public List<Literal> getBody() {
    return this.body;
  }

  public void setProb(Double prob){
    this.prob = prob ;
  }

  public Double getProb(){
    return this.prob ;
  }

  public void addLiteralToBody(Literal bestLiteral) {
    body.add(bestLiteral);
  }

  public boolean coversExample(Tuple tuple) {
    for (Literal literal : body) {
      if (!tuple.getLiterals().contains(literal))
        return false;
    }

    return true;
  }

  public boolean coversExamples(List<Tuple> tuples) {
    for (Tuple tuple : tuples) {
      if (coversExample(tuple)) {
        return true;
      }
    }
    return false;
  }

  public void removeLiteralFromBody(Literal literal) {
    body.remove(literal);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();

    // Append head literal
    sb.append("Head: ");
    sb.append(head.toString());

    // Append body literals
    sb.append("\nBody: ");
    if (body.isEmpty()) {
      sb.append("None");
    } else {
      for (int i = 0; i < body.size(); i++) {
        sb.append(body.get(i).toString());
        if (i < body.size() - 1) {
          sb.append(", ");
        }
      }
    }

    return sb.toString();
  }

}