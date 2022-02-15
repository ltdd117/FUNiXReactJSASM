import React, { useState } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

function Main (props) {

    const [dishes, setDishes] = useState(DISHES);
    const [comments, setComments] = useState(COMMENTS);
    const [promotions, setPromotions] = useState(PROMOTIONS);
    const [leaders, setLeaders] = useState(LEADERS);

    
    const HomePage = () => {
        return (
            <Home 
                dish={dishes.find((dish) => dish.featured)}
                promotion={promotions.find((promo) => promo.featured)}
                leader={leaders.find((leader) => leader.featured)}
            />
        );
    }

    

    const DishWithId = (props) => {
        const { dishId } = useParams();
        
        return(
            <DishDetail dish={dishes.find((dish) => dish.id === Number(dishId))} 
                comments={comments.filter((comment) => comment.dishId === Number(dishId))} />
        );
    };

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path='/menu' element={<Menu dishes={dishes} />} /> 
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path='/contactus' element={<Contact />} />
                <Route path='/menu/:dishId' element={<DishWithId />} />
            </Routes>
            <Footer />

        </div>
    );

}

export default Main;