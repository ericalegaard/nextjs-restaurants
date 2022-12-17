import Button from '../../components/Button'
import Col from '../../components/Col'
import Container from '../../components/Container'
import { Fragment } from 'react'
import Heading from '../../components/Heading'
import Link from 'next/link'
import Layout from '../../components/Layout'
import MenuItem from '../../components/MenuItem'
import Paragraph from '../../components/Paragraph'
import Row from '../../components/Row'
import Showcase from '../../components/Showcase'
import { getAllRestaurantSlugs, getSingleRestaurantBySlug } from "../../lib/api"

////////////////////////////////////////////////////////////////////////
// THE WATERFALL: define all possible parts before rendering anything //
//      (1) generate an array of all possible paths                   //
//      (2) fetch only the details of the one path you want           //
//      (3) render the page with only the data you want               //
////////////////////////////////////////////////////////////////////////

// (1) getStaticPaths (define all possible paths)
export async function getStaticPaths() {
    const restaurantSlugs = await getAllRestaurantSlugs();
    const paths = restaurantSlugs.map((restaurant) => {
        return {
            params: {
                id: restaurant.node.slug
            }
        }
    });
    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    }
}

// (2) getStaticProps (pick one of the possible paths and all its data)
export async function getStaticProps({params}) {
    const { id } = params;
    const restaurantData = await getSingleRestaurantBySlug(id);
    return {
        props: {
            restaurantData
        }, // will be passed to the page component as props
    }
}

// (3) render page component (pass only the data you want into the page)
const RestaurantPage = ({restaurantData}) => {
    const { title, excerpt, featuredImage, restaurantInformation } = restaurantData;
    const { location, contact, hours, menu } = restaurantInformation;
    const { streetAddress, city, state, zipCode } = location;
    const { phoneNumber, emailAddress } = contact;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = hours;
    return <Layout>
        <Showcase 
            backgroundImage={featuredImage ? featuredImage.node.sourceUrl : null}
            halfHeight
        />
        <Container>
            <Row>
                <Col width="9">
                    <Heading level="1" marginBottom="1">{title}</Heading>
                    <Paragraph marginBottom="1">{excerpt}</Paragraph>
                    {menu.menuItems && 
                        <Fragment>
                            <Heading level="2" marginBottom="1" marginTop="1">Menu</Heading>
                            {menu.menuItems.map((menuItemObj) => {
                                const { menuItem } = menuItemObj;
                                return <MenuItem data={menuItem}/>
                            })}
                        </Fragment>
                    }
                </Col>
                <Col width="3">
                    <Button label="Order Takeout"></Button>
                    <Button label="Make a Reservation"></Button>
                    {streetAddress && city && state && zipCode &&
                        <Fragment>
                            <Heading level="2" marginBottom="1" marginTop="1">Location</Heading>
                            <Paragraph marginBottom="2">
                                {streetAddress}<br />{city}, {state} {zipCode}
                            </Paragraph>
                        </Fragment>
                    }
                    { phoneNumber || emailAddress ?
                        <Fragment>
                            <Heading level="2" marginBottom="1">Contact</Heading>
                            <Paragraph marginBottom="2">
                                {phoneNumber && <Fragment>{phoneNumber}<br /></Fragment>}
                                {emailAddress && <a href={`mailto:${emailAddress}`}>{emailAddress}</a>}
                            </Paragraph>
                        </Fragment>
                    : ''}
                    <Heading level="2" marginBottom="1">Hours</Heading>
                    <Paragraph marginBottom="2">
                        {monday.openTime ?
                            <Fragment>
                                Monday: {monday.openTime} - {monday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Monday: Closed<br /></Fragment>}
                        {tuesday.openTime ?
                            <Fragment>
                                Tuesday: {tuesday.openTime} - {tuesday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Tuesday: Closed<br /></Fragment>}
                        {wednesday.openTime ?
                            <Fragment>
                                Wednesday: {wednesday.openTime} - {wednesday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Wednesday: Closed<br /></Fragment>}
                        {thursday.openTime ?
                            <Fragment>
                                Thursday: {thursday.openTime} - {thursday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Thursday: Closed<br /></Fragment>}
                        {friday.openTime ?
                            <Fragment>
                                Friday: {friday.openTime} - {friday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Friday: Closed<br /></Fragment>}
                        {saturday.openTime ?
                            <Fragment>
                                Saturday: {saturday.openTime} - {saturday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Saturday: Closed<br /></Fragment>}
                        {sunday.openTime ?
                            <Fragment>
                                Sunday: {sunday.openTime} - {sunday.closeTime}<br />
                            </Fragment>
                        : <Fragment>Sunday: Closed<br /></Fragment>}
                    </Paragraph>
                </Col>
            </Row>
        </Container>
    </Layout>
}
export default RestaurantPage