import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form") as HTMLFormElement;
const chatContainer = document.querySelector("#chat__container");

let loadInterval: any;

function loader(element: HTMLElement) {
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element: HTMLElement, text: string) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexNumber = randomNumber.toString(16);

  return `id-${timestamp}-${hexNumber}`;
}

function chatStripe(isAi: boolean, value: string, uniqueId?: string) {
  return ` 
        <div class="wrapper ${isAi && "ai"}">
            <div class="chat">
              <div class="profile">
                <img src="${isAi ? bot : user}" 
                alt="${isAi ? "bot" : "user"}" />
              </div>
              <div class="message" id=${uniqueId} >
                ${value}
              </div>
            </div>
        </div>
         `;
}

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const data = new FormData(form as HTMLFormElement);
  const textData = data.get("prompt") as string;

  // generate user chat stripe
  chatContainer!.innerHTML += chatStripe(false, textData);

  // reset form
  form.reset();

  // bot message
  const uniqueId = generateUniqueId();

  // bot stript
  chatContainer!.innerHTML += chatStripe(true, " ", uniqueId);
  chatContainer!.scrollTop = chatContainer!.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv as HTMLElement);

  try {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: textData }),
    };

    const response = await fetch("http://localhost:4000", settings);
    clearInterval(loadInterval);
    messageDiv!.innerHTML = "";

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim();

      typeText(messageDiv as HTMLElement, parsedData);
    } else {
      const err = await response.json();
      messageDiv!.innerHTML = "Something went wrong";
      alert(err);
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    handleSubmit(event);
  }
});
