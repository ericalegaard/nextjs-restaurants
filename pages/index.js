import { useState } from 'react'            // curly braces because it's one of many functions in the file
import { getAllRestaurants, getAllRestaurantTypes } from '../lib/api'
import Container from '../components/Container'
import Filters from '../components/Filters'
import Grid from '../components/Grid'
import Layout from '../components/Layout'
import Showcase from '../components/Showcase'

// creates a static version of your site for faster loading:
export async function getStaticProps() {
  const restaurants = await getAllRestaurants();
  const restaurantTypes = await getAllRestaurantTypes();
  return {
    props: {
      restaurants,
      restaurantTypes
    }, // will be passed to the page component as props
  }
}

const HomePage = ({ restaurants, restaurantTypes }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isActive, setActive] = useState(false);   // [state variable, setter function] -- sets isActive to false by default
  const filteredRestaurants = restaurants.filter((restaurant) => {
    if (activeCategory === "All") { 
      return restaurant; 
    }
    if (restaurant.node.restaurantTypes.edges.length > 0) { 
      return restaurant.node.restaurantTypes.edges[0].node.name === activeCategory ? restaurant 
    : false }
  });

  return <Layout>
    <Showcase 
      title="A guide to the best eating spots in Syracuse."
      description="With hundreds of restaurants located within the 315, there really is a little something for all tastes."
      backgroundImage="/images/dishes.jpeg"
      cta="View Restaurants"
    />
    <section>
      <Container>
        <Filters 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          categories={restaurantTypes}
        />
        <Grid data={filteredRestaurants}/>
      </Container>
    </section>
  </Layout>
}
export default HomePage