export const meta = {
  name: "catfact",
  author: "Liane Cagara",
  description: "Get a random cat fact",
  usage: "{prefix}catfact",
  category: "Fun",
  version: "1.0.1",
  permissions: [0],
  noPrefix: false,
  requirement: "2.5.0",
  icon: "🐱",
};

export const style = {
  title: "Cat Fact 🐱",
  titleFont: "bold_italic",
  contentFont: "fancy",
};
const { delay } = global.utils;

export async function entry({ output, input, requester }) {
  try {
    let i;
    if (!input.isWeb) {
      i = await output.reply(`MEOW!`);
    }
    const { response } = await requester("https://catfact.ninja/fact");

    const fact = response.fact;
    await delay(1000);

    if (i) {
      output.edit(fact, i.messageID);

      await delay(5000);

      output.edit(
        `${fact}

Do you love cassidy bot? ^^`,
        i.messageID,
      );
    } else {
      output.reply(fact);
    }

    output.reaction("😺");
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    output.reply(
      "Sorry, I couldn't fetch a cat fact at the moment. Please try again later.",
    );
  }
}
