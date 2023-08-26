function takeOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(
          "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
        )
          .then((response) => response.json())
          .then((data) => {
            const order = [];
            const len = data.length;
            for (let i = 0; i < 3; i++) {
              const rand = Math.floor(Math.random() * len);
              order.push(data[rand]);
            }
            resolve(order);
          })
          .catch((error) => reject(error));
      }, 2500);
    });
  }
  
  function getMenu() {
    fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const cardContainer = document.getElementById("card-container");
  
        for (let i = 1; i <= 6; i++) {
          const card = data.find((item) => item.id === i);
  
          // Create card element
          const cardElement = document.createElement("div");
          cardElement.classList.add("card");
  
          // Create image element
          const imgElement = document.createElement("img");
          imgElement.src = card.imgSrc;
          cardElement.appendChild(imgElement);
  
          // Create heading element
          const heading = document.createElement("h3");
          heading.innerHTML = card.name;
          heading.style.color = "white";
          cardElement.appendChild(heading);
  
          // Create price element
          const price = document.createElement("p");
          price.innerHTML = card.price;
          price.style.color = "white";
          price.style.display = "inline";
          
          const priceContainer = document.createElement("span");
          priceContainer.innerHTML = "$ ";
          priceContainer.style.display = "inline";
          priceContainer.style.color = "white";
          
          const additionalText = document.createElement("span");
          additionalText.innerHTML = "/-";
          additionalText.style.display = "inline";
          additionalText.style.color = "white";
          
          cardElement.append(priceContainer, price, additionalText);
          
          


          // Create button element
          const button = document.createElement("input");
          button.type = "button";
          button.classList.add("add-button");
          button.value = "+";
          button.style.backgroundColor = "#363a43";
          cardElement.appendChild(button);
  
          // Append card element to the container
          cardContainer.appendChild(cardElement);
        }
      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }


  // order prep function

  function orderPrep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  

  function payOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  function thankyouFnc() {
    alert("Thank you for eating with us today!");
  }
  
  window.onload = () => {
    getMenu();
  
    takeOrder()
      .then((order) => {
        console.log("Order placed:", order);
        return orderPrep();
      })
      .then((status) => {
        console.log("Order preparation status:", status);
        return payOrder();
      })
      .then((paymentStatus) => {
        console.log("Payment status:", paymentStatus);
        if (paymentStatus.paid) {
          thankyouFnc();
        }
      })
      .catch((error) => {
        console.log("Error occurred while taking the order:", error);
      });
  };