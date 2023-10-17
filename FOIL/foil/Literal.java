package foil;
import java.util.*;

public class Literal extends Predicate {

  List<String> arguments;

  public Literal(String name, int numArgs, List<String> arguments) {
    super(name, numArgs);
    this.arguments = arguments;

  }

  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append(name + " " + this.numArgs + " ");
    sb.append('(');
    for (int i = 0; i < arguments.size(); i++) {
      sb.append(arguments.get(i));
      if (i < arguments.size() - 1) {
        sb.append(", ");
      }
    }
    sb.append(')');
    return sb.toString();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;

    Literal literal = (Literal) o;

    if (numArgs != literal.numArgs)
      return false;
    if (name != null ? !name.equals(literal.name) : literal.name != null)
      return false;


    Set<String> thisArgumentsSet = new HashSet<>(arguments);
    Set<String> literalArgumentsSet = new HashSet<>(literal.arguments);
    return thisArgumentsSet.equals(literalArgumentsSet);
  }

  @Override
  public int hashCode() {
    int result = name != null ? name.hashCode() : 0;
    result = 31 * result + numArgs;
    result = 31 * result + (arguments != null ? arguments.hashCode() : 0);
    return result;
  }

}
