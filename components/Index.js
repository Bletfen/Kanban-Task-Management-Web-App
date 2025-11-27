async function putData() {
  const res = await fetch(
    "http://localhost:3000/api/boards/Platform%20Launch/columns/Todo/tasks/1",
    {
      method: "PUT",
      "Content-Type": "application/json",
      body: JSON.stringify({}),
    }
  );
}
putData();
