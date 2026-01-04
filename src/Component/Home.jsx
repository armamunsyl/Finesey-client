import React from 'react'
import Banner from '../Pages/Banner'
import Overview from '../Pages/Overview'
import HowItWorks from '../Pages/HowItWorks'
import BudgetingTips from '../Pages/BudgetingTips'
import FinancialPlanning from '../Pages/FinancialPlanning'
import FinalCTA from '../Pages/FinalCTA'

const Home = () => {
  return (
    <div className='bg-base-100'>
        <Banner></Banner>
        <Overview></Overview>
        <HowItWorks></HowItWorks>
        <BudgetingTips></BudgetingTips>
        <FinancialPlanning></FinancialPlanning>
        <FinalCTA></FinalCTA>
    </div>
  )
}

export default Home
