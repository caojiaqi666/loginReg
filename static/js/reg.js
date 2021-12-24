window.onload = () => {
  const userName = document.getElementById("userName")
  const passWd = document.getElementById("passWd")
  const btn = document.querySelector("button")

  btn.onclick = async () => {
    let username = userName.value
    let passwd = passWd.value

    let res = await axios({
      url: "/reg",
      method: "POST",
      Headers: {
        "Content-Type": "application/json"
      },
      // get 放在params里；post放在data里
      data: {
        username,
        passwd
      }
    })
    console.log(res);
  }
}