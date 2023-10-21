package com.FOIL.services.logic;
import java.util.*;

public class Tuple {

  Set<Literal> literals;

  Integer ID;

  public Tuple(Integer ID, String[] data, String[] header) {
    this.ID = ID;
    literals = new HashSet<>();
    HashSet<String> falsyValue = new HashSet<>();
    falsyValue.add("false");
    falsyValue.add("n");
    falsyValue.add("N");

    for (int i = 0; i < data.length; i++) {
      if (falsyValue.contains(data[i].trim()))
        continue;

      String attrName = header[i].trim();
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

  public String toString(){
    return literals.toString();
  }

}
