export async function withFancyErrorMessages<T = any>(attempt: Readonly<Promise<T>>) {
  const callable = () => attempt;
  try {
    return await callable();
  } catch (e) {
    const contractErrorMessage = e.data?.message?.split("'")[1];
    if (typeof contractErrorMessage === "string" && contractErrorMessage !== "") {
      alert(contractErrorMessage);
    } else if (e.code === 4001) {
      alert("User cancelled the transaction");
    } else {
      alert(JSON.stringify(e));
    }
  }
}
