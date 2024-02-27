import './styles/App.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import { update_theme } from "./includes/redux/slices/theme.slice";
import { useDispatch } from 'react-redux';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
      function updateSize() { setSize([window.innerWidth, window.innerHeight]); }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const useScrollOffset = () => {
  const [offset,setOffset] = useState([0,0]);
  useLayoutEffect(() => {
      function updateOffset(){ setOffset([window.screenX,window.screenY]); }
      window.addEventListener('scroll',updateOffset);
      updateOffset();
      return () => window.removeEventListener('scroll',updateOffset);
  },[]);
  return offset;
};

const App = ({children}) => {
  const dispatch = useDispatch();
  const [width]   = useWindowSize();
  const [x,y]     = useScrollOffset();

  useEffect(() => {
    dispatch(update_theme({
      WIDTH: width
    }));
  },[width]);

  useEffect(() => {
    dispatch(update_theme({
      Y: y
    }));
  },[y]);


  return (<>
    {children}  
  </>)
};

export default App;
