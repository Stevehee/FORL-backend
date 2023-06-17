import java.util.*;

public class Tuple {

  Set<Literal> literals;

  Integer ID;

  public Tuple(Integer ID, String[] data) {
    this.ID = ID;
    literals = new HashSet<>();

    for (int i = 0; i < data.length; i++) {
      if (isNum(data[i]))
        continue;
      if ("false".equals(data[i].trim()) || "n".equals(data[i].trim()))
        continue;

      String attrName = Constants.attrName[i].trim();
      int numArgs = isBoolean(data[i].trim()) ? 1 : 2;
      List<String> arguments = new ArrayList<>();

      if (numArgs > 1) {
        arguments.add(data[i].trim());
      }

      Literal newLiteral = new Literal(attrName, numArgs, arguments);

      literals.add(newLiteral);
    }
  }

  private static boolean isNum(String str) {
    try {
      Double.parseDouble(str);
      return true;
    } catch (NumberFormatException e) {
      return false;
    }
  }

  private static boolean isBoolean(String str) {
    return "true".equalsIgnoreCase(str) || "false".equalsIgnoreCase(str)
        || "y".equalsIgnoreCase(str) || "n".equalsIgnoreCase(str);

  }

  public Integer getID() {
    return this.ID;
  }

  public Set<Literal> getLiterals() {
    return this.literals;
  }

}
