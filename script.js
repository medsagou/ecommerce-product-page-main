const cartDisplayButton = document.getElementById('cart-container');
const cartDisplayContent = document.getElementById('cart-content-conatiner');

const minPreImages = document.getElementsByClassName('not-pop-up-image-pre-container');
const miniPreImagePopUp = document.getElementsByClassName('pop-up-image-pre-container');

const productPreImages = document.getElementsByClassName('main-page-product-img-preview');
const productPreImagesPopUp = document.getElementsByClassName('pop-product-img-preview');

const popContainerPreview = document.getElementById('preview-light-box');
const closePopUpButton = document.getElementById('closePopUp');

const mobileNextArrow = document.getElementById('mobile-next-arrow');
const mobilePreviousArrow = document.getElementById('mobile-previous-arrow');

const desktopNextArrow = document.getElementById('desktop-next-arrow');
const desktopPreviousArrow = document.getElementById('desktop-previous-arrow');

const minusBtn = document.getElementById('minus-button');
const plusBtn = document.getElementById('plus-button');
const numberOfItems = document.getElementById('number-of-items');

const addToCartBtn = document.getElementById('add-to-cart-button');
const emptyCart = document.getElementById('empty');
const notEmptyCart = document.getElementById('content');
const removeItemsBtn = document.getElementById('delete-button');


const priceInCart = document.getElementById('price-and-number-of-items');

const notificationDisplay = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

const menuDisplay = document.getElementById('menu');
const menuBtn = document.getElementById('menu-button');
const closeMenuBtn = document.getElementById('closeMenuBtn');




menuBtn.addEventListener('click', function(){
    menuDisplay.setAttribute('area', 'active');
})
closeMenuBtn.addEventListener('click', ()=>(
    menuDisplay.setAttribute('area','not-active')
))
removeItemsBtn.addEventListener('click', function() {
    const priceInCart = document.getElementById('price-and-number-of-items');
    emptyCart.setAttribute('preview','true');
    notEmptyCart.setAttribute('preview','false');
    priceInCart.setAttribute('number', 0);
    notificationDisplay.setAttribute('state','not-active');
})
addToCartBtn.addEventListener('click',function(){
    const price = 125;
    const numberOfItems = document.getElementById('number-of-items');
    const checkItems = checkNumberOfItems(numberOfItems);
    const currNumberOfItems = getNumberOfItems(numberOfItems);
    const priceInCart = document.getElementById('price-and-number-of-items');
    const currentInCart = priceInCart.getAttribute('number');
    const notificationText = document.getElementById('notification-text');

    var total = price * currNumberOfItems;
    if (currentInCart == '0'){
        if (checkItems){
            emptyCart.setAttribute('preview','false');
            notEmptyCart.setAttribute('preview','true');
            priceInCart.innerHTML ="$"+ price +".00 x "+ currNumberOfItems +"  <span class=\"total\">$"+ total +".00</span>"
            priceInCart.setAttribute('number', currNumberOfItems)
            notificationText.innerHTML = currNumberOfItems;
            notificationDisplay.setAttribute('state','active');
        }
    } else {
        if (checkItems){
            var totalItems = currNumberOfItems + parseInt(currentInCart)
            total = price * totalItems;
            emptyCart.setAttribute('preview','false');
            notEmptyCart.setAttribute('preview','true');
            priceInCart.innerHTML ="$"+ price +".00 x "+ totalItems +"  <span class=\"total\">$"+ total +".00</span>"
            priceInCart.setAttribute('number', totalItems)
            notificationText.innerHTML = totalItems;
            notificationDisplay.setAttribute('state','active');
        }
    }
    numberOfItems.innerHTML = 0;
})






// items number
increaseDecreaseItems(plusBtn, minusBtn, numberOfItems);

// mobile arrow
const classNameForMobile = 'main-page-product-img-preview';
const classNameForDesktop = 'pop-product-img-preview';
arrowFunction(mobileNextArrow, classNameForMobile,true, 0);
arrowFunction(mobilePreviousArrow, classNameForMobile, false, 0)

arrowFunction(desktopNextArrow, classNameForDesktop,true, 1);
arrowFunction(desktopPreviousArrow, classNameForDesktop, false, 1)


// cart display
cartDisplayButton.addEventListener('click', function (){
    const cartDisplayState = cartDisplayContent.getAttribute('state')
    if (cartDisplayState == 'false'){
        cartDisplayContent.style.display= '';
        cartDisplayContent.setAttribute('state','true')
    } else {
        cartDisplayContent.style.display= 'none';
        cartDisplayContent.setAttribute('state', 'false');
    }
})
window.addEventListener('click', function(e){
    if(!cartDisplayContent.contains(e.target) & !cartDisplayButton.contains(e.target)){
        cartDisplayContent.style.display= 'none';
        cartDisplayContent.setAttribute('state', 'false');
    }
})

// display preview
for (let i = 0; i < minPreImages.length; i++){
    let d = i + 4
    minPreImages[i].addEventListener('click', function(){
        minPreImages[i].setAttribute('preview','true');
        miniPreImagePopUp[i].setAttribute('preview','true');
        productPreImages[i].setAttribute('preview','true');
        productPreImagesPopUp[i].setAttribute('preview','true')
        for (let j = 0; j < minPreImages.length; j++){
            if (j==i){
                continue;
            } else {
                minPreImages[j].setAttribute('preview','false')
                miniPreImagePopUp[j].setAttribute('preview','false')
                productPreImages[j].setAttribute('preview','false');
                productPreImagesPopUp[j].setAttribute('preview','false')
            }
        }
    })
}



// pop up preview
    // display
for (let i = 0; i < productPreImages.length; i++){
    productPreImages[i].addEventListener('click', function (){
        popContainerPreview.setAttribute('preview','active')
        closePopUpButton.addEventListener('click', ()=>(
        popContainerPreview.setAttribute('preview','not-active')
        ))
    })
}
    // clicks
    for (let i = 0; i < miniPreImagePopUp.length; i++){
        let d = i + 4
        miniPreImagePopUp[i].addEventListener('click', function(){
            miniPreImagePopUp[i].setAttribute('preview','true');
            productPreImagesPopUp[i].setAttribute('preview','true')
            for (let j = 0; j < miniPreImagePopUp.length; j++){
                if (j==i){
                    continue;
                } else {
                    miniPreImagePopUp[j].setAttribute('preview','false')
                    productPreImagesPopUp[j].setAttribute('preview','false')
                }
            }
        })
    }


// functions sections -----------------------------------------------------------------------------------------------------------


// inside out side cart reacting
function checkNumberOfItems(htmlSelector){
    const numberOfItems = htmlSelector.innerHTML;
    const interger = parseInt(numberOfItems)
    if(interger == 0){
        return false;
    }else{
        return true;
    }
}
function getNumberOfItems(htmlSelector){
    const numberOfItems = htmlSelector.innerHTML;
    return parseInt(numberOfItems)
}


// increase decrease items
function increaseDecreaseItems(plus, minus, display){
    console.log()
    plus.addEventListener('click', function(){
        const currNumberOfItems = parseInt(display.innerHTML);
        var newNumberOfItems = currNumberOfItems + 1;
        display.innerHTML = newNumberOfItems;
    })
    minus.addEventListener('click', function(){
        const currNumberOfItems = parseInt(display.innerHTML);
        if ( currNumberOfItems != 0){
            var newNumberOfItems = currNumberOfItems - 1;
            display.innerHTML = newNumberOfItems;
        }
    })
}


function getCurrentStatesPreview(stateToExtract){
    const state=[];
    for(let i=0 ; i < stateToExtract.length; i++){
        let currState = stateToExtract[i].getAttribute('preview');
        state.push(currState)
    }
    return state;
}



// arrow mobile function
function arrowFunction(arrow, className, direction, device){
    arrow.addEventListener('click',function(){
        const productPreImages = document.getElementsByClassName(className);
        const statesList = getCurrentStatesPreview(productPreImages);
        const miniPreImagePopUp = document.getElementsByClassName('pop-up-image-pre-container');
        let indexOfDisplay = statesList.indexOf('true');
        productPreImages[indexOfDisplay].setAttribute('preview','false');
        miniPreImagePopUp[indexOfDisplay].setAttribute('preview','false');
        if (device == 0){
            if (direction == false) {
                if (indexOfDisplay != 0){
                    productPreImages[indexOfDisplay - 1].setAttribute('preview','true');
                }else{
                    productPreImages[3].setAttribute('preview','true');
                }
            } else if (direction == true){
                if (indexOfDisplay != 3){
                    productPreImages[indexOfDisplay + 1].setAttribute('preview','true');
                }else{
                    productPreImages[0].setAttribute('preview','true');
                }
            }
        }else if (device == 1){
            console.log('ipased')
            if (direction == false) {
                if (indexOfDisplay != 0){
                    productPreImages[indexOfDisplay - 1].setAttribute('preview','true');
                    miniPreImagePopUp[indexOfDisplay - 1].setAttribute('preview','true');
                }else{
                    productPreImages[3].setAttribute('preview','true');
                    miniPreImagePopUp[3].setAttribute('preview','true');
                }
            } else if (direction == true){
                if (indexOfDisplay != 3){
                    productPreImages[indexOfDisplay + 1].setAttribute('preview','true');
                    miniPreImagePopUp[indexOfDisplay + 1].setAttribute('preview','true');
                }else{
                    productPreImages[0].setAttribute('preview','true');
                    miniPreImagePopUp[0].setAttribute('preview','true');
                }
            }
        }
    })
}