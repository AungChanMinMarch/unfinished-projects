function get_data(id) {
  return new Promise((res) => {});
}
async function build_data(id) {
  const data = await get_data(id);
  console.log(data);
}
