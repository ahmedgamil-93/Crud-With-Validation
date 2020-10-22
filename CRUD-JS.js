var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput=document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlart = document.getElementById("productPriceAlart");
var productCatAlart= document.getElementById("productCatAlert");
var productList;
 if(localStorage.getItem("myProducts")==null)
 {
     productList=[]
 }
 else
 {
     productList=JSON.parse(localStorage.getItem("myProducts"));
     displayProducts(productList);

 }
function addProduct()
{
    product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
    productList.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productList));
    displayProducts(productList);
    clearForm();
    
}

function displayProducts(anyArray) // general function for display any array ;)
{
    cartoona=""
    for(var i=0 ; i<anyArray.length ; i++)
    {
        cartoona+=` <tr>
                          <td>${i}</td>
                          <td>${anyArray[i].name}</td>
                          <td>${anyArray[i].price}</td>
                          <td>${anyArray[i].category}</td>
                          <td>${anyArray[i].desc}</td>
                          <td><buttom class="btn btn-warning" onclick="updateProduct(${i})">Update<buttom></td>
                          <td><buttom onclick="deleteProduct(${i})" class="btn btn-danger">Delete<buttom></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=cartoona;

}

function clearForm()
{
        productNameInput.value=''
        productPriceInput.value=''
        productCategoryInput.value=''
        productDescInput.value=''
}

function deleteProduct(index)
{
    if (confirm("Are you sure to delete this item?")){
    productList.splice(index,1)
    localStorage.setItem("myProducts", JSON.stringify(productList));
    displayProducts(productList);}   

}

function searchProducts()
{
    var term =searchInput.value;
   var wanntedProducts=[];
   for(var i =0 ; i<productList.length ; i++)
   {
       if(productList[i].name.toLowerCase().includes(term.toLowerCase()))
       {
        wanntedProducts.push(productList[i]);       
       }
       
   }
   displayProducts(wanntedProducts);
   
   }
   var productIndex = 0;
   function updateProduct(index)
   {
       productNameInput.value=productList[index].name;
       productPriceInput.value=productList[index].price ;
       productCategoryInput.value=productList[index].category;
       productDescInput.value=productList[index].desc;
       addBtn.style.display="none";
       updateBtn.style.display="inline-block";
       productIndex =index ;   
       console.log(productIndex);
   }
 function saveUpdates()
 {
     productList[productIndex].name=productNameInput.value;
     productList[productIndex].price=productPriceInput.value;
     productList[productIndex].category=productCategoryInput.value;
     productList[productIndex].desc=productDescInput.value;
     addBtn.style.display="inline-block";
     updateBtn.style.display="none";
     localStorage.setItem("myProducts", JSON.stringify(productList));
     displayProducts(productList);
     clearForm();


 }
 var regex= /^[A-Z][a-z]{3,6}$/;

 function validatProductName(productName)
 {
     if(regex.test(productName)==true)
     {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        productNameAlert.classList.replace("d-block" , "d-none");




     }
     else
     {

       productNameAlert.classList.replace("d-none" , "d-block");
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
 



     }
 }

    productNameInput.addEventListener("keyup" , function(){
        validatProductName(productNameInput.value);
    });

    var regex1=/^(([1-9][0-9]{2,3})|10000)$/;

 function validatProductPrice(productPrice)
 {
     if(regex1.test(productPrice)==true)
     {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        productPriceAlert.classList.replace("d-block" , "d-none");




     }
     else
     {

       productPriceAlert.classList.replace("d-none" , "d-block");
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
     }
 }
    productPriceInput.addEventListener("keyup" , function(){
        validatProductPrice(productPriceInput.value);
    });


    var reg=/^[A-Z][a-z]{3,9}$/;
    function validatProductCategory(productCategory)
    {
        if(reg.test(productCategory)==true)
        {
            productCatAlart.classList.replace("d-block" , "d-none");
            productCategoryInput.classList.add("is-valid");
            productCategoryInput.classList.remove("is-invalid");




        }
        else{
            productCatAlart.classList.replace("d-none" , "d-block");
            productCategoryInput.classList.add("is-invalid");
            productCategoryInput.classList.remove("is-valid");



        }
    }
    productCategoryInput.addEventListener("keyup" , function(){
        validatProductCategory(productCategoryInput.value); 
    })