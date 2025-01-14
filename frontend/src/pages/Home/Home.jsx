import React from 'react';
import TaskList from '../Task/TaskList/TaskList';
import SideBar from './SideBar';

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-20 pt-4 lg:pt-6">
 
      <div className="hidden lg:block w-[25%] lg:pr-5">
        <SideBar />
      </div>

      <div className="w-full ml-12 flex justify-center">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
