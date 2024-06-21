const log = () => {
    window.location.href = "./sell.html"
}

const changeQuantity = (button, delta) => {
    const quantityElement = button.parentElement.children[1];
    let currentQuantity = parseInt(quantityElement.innerText);
    let newQuantity = currentQuantity + delta;

    if (newQuantity >= 0) {
        quantityElement.innerText = newQuantity;
    }
}