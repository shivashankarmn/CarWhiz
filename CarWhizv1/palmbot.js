const chatInput = document.querySelector(".chat-input");
const sendButton = document.querySelector(".send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector(".delete-btn");
const themeButton = document.querySelector(".theme-btn");

const API_KEY = "Enter_Your_API_Key";
let UserText = null;

const loadDataFromLocalStorage = () => {
  const themeColor = localStorage.getItem("themeColor");
  document.body.classList.toggle("light-mode", themeColor === "light_mode");
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";

  const defaultText = `<div class="default-text">
                            <h1>CarWhiz</h1>
                            <h3>Explore the world of cars.</h3>
                        </div>`;

  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

const getChatResponse = async (inChatDiv) => {

  const greetings = ["hi", "hello","hey"];
  const farewells = ["bye"];
  const API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=" +
  API_KEY;

  if (greetings.includes(UserText.toLowerCase())) {
    inChatDiv.querySelector(".typing-animation").remove();
    const greetingMessage = "Hi there! Please Specify your needs for the car";
    const greetingElement = document.createElement("p");
    greetingElement.textContent = greetingMessage;
    inChatDiv.querySelector(".chat-details").appendChild(greetingElement);
  } else if (farewells.includes(UserText.toLowerCase())) {
    inChatDiv.querySelector(".typing-animation").remove();
    const farewellMessage = "Goodbye! Have a great day!";
    const farewellElement = document.createElement("p");
    farewellElement.textContent = farewellMessage;
    inChatDiv.querySelector(".chat-details").appendChild(farewellElement);
  } else {


  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: {
        context: "",
        examples: [],
        messages: [
          {
            content:"Name only one Volkswagen car present in India , dont include Polo car."+ UserText + "  It should be in this form :Name \n Mileage \n Indian Price\n Seats \n Engine Type \n Colors \n Reviews in Star out of 5\n Top 5 features in points \n Top 5 best features compared to same range other cars.",
          },
        ],
      },
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    }),
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const data = await response.json();



    //console.log("Message Response:", data);
    //console.log("Message text:", data.candidates[0].content);
    if (
      data.filters &&
      data.filters.length > 0 &&
      data.filters[0].reason === "OTHER"
    ) {
      inChatDiv.querySelector(".typing-animation").remove();
      const errorMessage = "Sorry, I can't assist you with this.";
      const errorElement = document.createElement("p");
      errorElement.textContent = errorMessage;
      inChatDiv.querySelector(".chat-details").appendChild(errorElement);
    } else if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content
    ) {
      inChatDiv.querySelector(".typing-animation").remove();
      const message = data.candidates[0].content;
      const messageElement = document.createElement("p");
      messageElement.textContent = message;
      inChatDiv.querySelector(".chat-details").appendChild(messageElement);
    } else {
      throw new Error("API call failed");
    }


    const responseContent = data.candidates[0].content;
    const contentSections = responseContent.split("\n");
    const carName = contentSections[0]; 
    console.log("Message Response:", carName);// Assuming the car name is the first part of the content

    let carImageURL;
    let carImageLink;

    if (carName.includes("Tiguan")) {
      carImageURL = 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Volkswagen/Tiguan-Allspace-2022/8433/1620814896404/front-left-side-47.jpg';
      carImageLink = 'https://www.volkswagen.co.in/en/models/new-tiguan.html';
    } else if (carName.includes("Vento")) {
      carImageURL = 'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20170908040350_VW-Vento-Allstar.jpg&w=700&q=90&c=1'; 
      carImageLink = 'https://www.volkswagen.co.in/en/owners/accessories/vento.html';
    } else if (carName.includes("ameo")) {
      carImageURL = 'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20180413053434_Pacemeo.jpg&w=700&q=90&c=1'; 
      carImageLink = 'https://www.volkswagen.co.in/en/owners/accessories/ameo.html';
    } else if (carName.includes("taigun")) {
      carImageURL = 'https://staticimg.amarujala.com/assets/images/2021/03/31/2021-volkswagen-taigun_1617172932.jpeg?w=414'; 
      carImageLink = 'https://www.volkswagen.co.in/en/models/taigun.html';
    } else if (carName.includes("virtus")) {
      carImageURL = 'https://assets.volkswagen.com/is/image/volkswagenag/virtus-gt-edge-collection-1920x1080-2?Zml0PWNyb3AsMSZmbXQ9anBnJnFsdD03OSZ3aWQ9ODAwJmhlaT00NTAmYWxpZ249MC4wMCwwLjAwJmJmYz1vZmYmNjYwMA=='; 
      carImageLink = 'https://www.volkswagen.co.in/app/site/virtus-gt-edge-booking/';
    }else {
      // Default image in case it's neither of the specified cars
      carImageURL = 'https://upload.wikimedia.org/wikipedia/commons/9/91/VW_Polo_beats_%28VI%29_%E2%80%93_f_03032019_%28exposure_adjusted%29.jpg'; 
      carImageLink = 'https://www.volkswagen.co.in/en.html';
    }
    const imageLink = document.createElement('a');
    imageLink.href = carImageLink;
    imageLink.target = "_blank"; 

    const carImage = document.createElement('img');
    carImage.src = carImageURL;
    carImage.alt = 'Car Image';
    carImage.style.width = '200px'; // Set your preferred width
    carImage.style.height = 'auto';
    inChatDiv.querySelector(".chat-details").appendChild(carImage);
    
    imageLink.appendChild(carImage); // Placing the image inside the link
    inChatDiv.querySelector(".chat-details").appendChild(imageLink);

    carImage.addEventListener('mouseover', function() {
      carImage.style.transform = 'scale(1.1)'; // Change the scale as desired for the effect
      carImage.style.transition = 'transform 0.5s'; // Adjust the transition duration as needed
    });

    carImage.addEventListener('mouseout', function() {
      carImage.style.transform = 'scale(1)';
      carImage.style.transition = 'transform 0.5s';
    });


  } catch (error) {
    inChatDiv.querySelector(".typing-animation").remove();
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent =
      "Oops! Something went wrong while retrieving the response. Please try again.";
    inChatDiv.querySelector(".chat-details").appendChild(errorElement);
    
  }

  localStorage.setItem("all-chats", chatContainer.innerHTML);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
}
};

const copyResponse = (copyBtn) => {
  const responseTextElement = copyBtn.parentElement.querySelector("p");
  navigator.clipboard.writeText(responseTextElement.textContent);
  copyBtn.textContent = "done";
  setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
};

const showTypingAnimation = () => {
  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/robot.png" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
  const inChatDiv = createChatElement(html, "incoming");
  chatContainer.appendChild(inChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(inChatDiv);
};

const handleOutgoingChat = () => {
  UserText = chatInput.value.trim();
  if (!UserText) return;

  chatInput.value = "";
  chatInput.style.height = `${initialInputHeight}px`;

  const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.png" alt="user-img">
                        <p>${UserText}</p>
                    </div>
                </div>`;

  const outChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
  getChatResponse(outChatDiv);
};

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    localStorage.removeItem("all-chats");
    loadDataFromLocalStorage();
  }
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("themeColor", themeButton.innerText);
  themeButton.innerText = document.body.classList.contains("light-mode")
    ? "dark_mode"
    : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalStorage();
sendButton.addEventListener("click", handleOutgoingChat);
