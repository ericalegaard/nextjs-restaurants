const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}
	return json.data
}

// GraphQL - requesting exact data and getting back that exact data in json format:
        // **non-existent values will return NULL as opposed to it breaking your whole code
export async function getAllRestaurants() {
	const data = await fetchAPI(`
        query NewQuery {
            restaurants {
            edges {
                node {
                title
                excerpt
                slug
                featuredImage {
                  node {
                    sourceUrl
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
                restaurantTypes {
                    edges {
                    node {
                        id
                        name
                    }
                    }
                }
                }
            }
            }
        }
    `)
	return data?.restaurants.edges
}

export async function getAllRestaurantSlugs() {
  const data = await fetchAPI(`
    query NewQuery {
        restaurants {
          edges {
            node {
              slug
            }
          }
        }
      }`)
    return data?.restaurants.edges
}

export async function getSingleRestaurantBySlug(id) {
const data = await fetchAPI(`
query MyQuery($id: ID!) {
    restaurant(idType: URI, id: $id) {
    title
    slug
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    restaurantInformation {
      location {
        streetAddress
        city
        state
        zipCode
      }
      contact {
        phoneNumber
        emailAddress
      }
      hours {
        monday {
          openTime
          closeTime
        }
        tuesday {
          openTime
          closeTime
        }
        wednesday {
          openTime
          closeTime
        }
        thursday {
          openTime
          closeTime
        }
        friday {
          openTime
          closeTime
        }
        saturday {
          openTime
          closeTime
        }
        sunday {
          openTime
          closeTime
        }
      }
      menu {
        menuItems {
          menuItem {
            description
            title
            price
            image {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
        }
      }
    }
    }
}
`, {
    variables: {
        "id": id
    }
    })
    return data?.restaurant
}

export async function getAllRestaurantTypes() {
  const data = await fetchAPI(`
    query MyQuery {
      restaurantTypes {
        edges {
          node {
            name
          }
        }
      }
    }
  `)
  return data?.restaurantTypes.edges
}