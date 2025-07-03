import React, { useRef, useEffect, useState } from 'react';

export default function ScrollWindow({items, loadStep, ListItem, className}) {
  const listRef = useRef();
  const [visibleItems, setVisibleItems] = useState(items.slice(-loadStep));
  const [lastIndex, setLastIndex] = useState(-loadStep);
  const [prevHeight, setPrevHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  
  useEffect(() => {
    const listEle = listRef.current;
    if (prevHeight === 0) {
      listEle.scrollTop = listEle.scrollHeight - listEle.offsetHeight;
    } else {
      console.log(listEle.scrollHeight - prevHeight)
      listEle.scrollTop = scrollTop + listEle.scrollHeight - prevHeight;
    }
  }, [visibleItems]);
  
  function handleScroll(e) {
    const listEle = e.target;
    if (listEle.scrollTop === 0) {
      setVisibleItems((prev) => [
        ...items.slice(lastIndex - loadStep, lastIndex),
        ...prev,
      ]);
      setLastIndex((prev) => prev - loadStep);
      setPrevHeight(listEle.scrollHeight)
      setScrollTop(listEle.scrollTop)
    }
  }
  
  return <ul className={className} ref={listRef} onScroll={(e) => handleScroll(e)}>
    {visibleItems.map((i) => (
      //<Item index={i} key={i} />
      <ListItem index={i} />
    ))}
  </ul>
}