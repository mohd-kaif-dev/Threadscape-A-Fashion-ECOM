import fs from "fs"
import axios from "axios"
import { products } from "./data/testData.js";

const UNSPLASH_API_KEY = ""; // Replace with your Unsplash API key

async function fetchProductImages() {
    for (let product of products) {
        // const query = encodeURIComponent(product.name);
        // const response = await axios.get(
        //     `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`
        // );

        // if (response.data.results.length > 0) {
        //     // Pick the first image result
        //     product.images[0].url = response.data.results[0].urls.small;
        //     if (product.images[1]) product.images[1].url = response.data.results[1].urls.small;
        // } else {
        //     product.images[0].url = "https://picsum.photos/500/500?random=2"; // Use a placeholder for missing results
        //     product.images[1].url = "https://picsum.photos/500/500?random=3"; // Use a placeholder for missing results
        // }
        product.images[0].imageId = "";
        if (product.images[1]) product.images[1].imageId = "";
    }

    // Save updated product data back to the file
    fs.writeFileSync("./UpdatedProductData.js", JSON.stringify(products, null, 2));
    console.log("Product data updated successfully!");
}

fetchProductImages();
