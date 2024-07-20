export const mockFailure = (
  failChance = "none" //"none" | "some" | "always" = "none"
) => {
  if (failChance === "none") {
    return;
  }

  if (failChance === "always") {
    throw new Error("Artificial Error");
  }

  if (failChance === "some") {
    const randomNumber = Math.random();

    if (randomNumber <= 0.5) {
      throw new Error("Artificial Error");
    }
  }
};

export function waitFor(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
