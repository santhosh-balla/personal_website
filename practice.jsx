/* 
function UserBage(props){

    //props here is just an argument - it for now doens't mean anything

    let username  = props.username 
    let role = props.role
    let isActive = props.isActive

    return (

        <>
        <h1>{username}</h1>
        <p>{role}</p>
        {isActive  ? <p> Active</p> : <p> Offline</p>}
        </>
    );
 
}

guest = {username: 'user1', role: 'guest', isActive: false}
admin = {username: 'user1', role: 'admin', isActive: false}
member = {username: 'user1', role: 'member', isActive: false}


export default function MainPage(){

    return(

        <>
        <UserBage {...guest}  
        />
        <UserBage 
        username = {"user2"}
        role = {"member"}
        isActive = {true}        
        />
        <UserBage 
        username = {"user3"}
        role = {"admin"}
        isActive = {true}        
        />
        </>

        
    )
}

*/

/** 
function ProductCard({product, currencySymbol, inStock}){

    return(

        <>
        <p>product name is {product.name}</p>
        <p>product price is {product.price + currencySymbol}</p>
        {inStock ? <p>product is in stock</p> : <p>product is not in stock</p>}
        </>
    )

}


export default function ProductPage(){

    return (
        <ProductCard
        product = {{name: "pencil", price: 10}}
        inStock = {true}
        currencySymbol = "$"
        
        />

    )
    
}
*/

import { getImageUrl } from './utils.js';


function ScientistProfile({size, name, profession, awards, discovered, imageId }){

    return(
            <>
            <h2>{name}</h2>
            <img
            className="avatar"
            src={getImageUrl(imageId)}
            alt={name}
            width={size}
            height={size}
            />
            <ul>
            <li>
                <b>Profession: </b> 
                {profession}
            </li>
            <li>
                <b>Awards: {awards.NumberOfAwards}</b> 
                {"(" + awards.ListOfAwards + ")"}
            </li>
            <li>
                <b>Discovered: </b>
                {discovered}
            </li>
            </ul>
            </>
    )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section classname = "profile">
        <ScientistProfile
        size = {70}
        imageId = {"szV5sdG"}
        name = "Maria Skłodowska-Curie"
        awards = {{NumberOfAwards: 4, ListOfAwards: "Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal" }}
        profession = {"physicist and chemist"}
        discovered = {"polonium (chemical element)"}
        />
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}

export default function Helloworld(){
    let helloworld = <p>helloworld</p>

    return ({helloworld})
}
