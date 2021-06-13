import React from 'react';
import ShowCard from './ShowCard';
import NOT_FOUND_IMAGE from '../../images/not-found.png';

const ShowGrid = ({ data }) => {
  return (
    <div>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : NOT_FOUND_IMAGE}
          summary={show.summary}
        />
      ))}
    </div>
  );
};

export default ShowGrid;
