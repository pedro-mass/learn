let trainedNet;

function encode(arg) {
  return arg.split("").map(x => x.charCodeAt(0) / 255);
}

function processTrainingData(data) {
  return data.map(d => {
    return {
      input: encode(d.input),
      output: d.output
    };
  });
}

function train(data) {
  let net = new brain.NeuralNetwork();
  net.train(processTrainingData(data));
  trainedNet = net.toFunction();
  console.log("Finished training...");
}

function execute(input) {
  let results = trainedNet(encode(input));

  console.log("results:", results);
  let output;
  // results.trump > results.kardashian
  //   ? (output = "Trump")
  //   : (output = "Kardashian");
  output = results.trump > results.kardashian ? "Trump" : "Kardashian";
  return output;
}

train(trainingData);

console.log(
  execute("These aren't real. Kanye would never write Yeezy on the side")
);
