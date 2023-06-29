export function ResultsSummary() {
  return (
    <div className="bg-red-500">
      <section className="text-center">
        <p>Your Result</p>

        <p className="">
          <span>76</span>
          <span>of 100</span>
        </p>

        <div>
          <p>Great</p>
          <p>
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </div>
      </section>

      <section>
        <h2>Summary</h2>

        <div>
          <span>i</span>
          <span>Reaction</span>
          <span>80 / 100</span>
        </div>
        <div>
          <span>i</span>
          <span>Memory</span>
          <span>92 / 100</span>
        </div>
      </section>

      <section>
        <button>Continue</button>
      </section>
    </div>
  );
}
