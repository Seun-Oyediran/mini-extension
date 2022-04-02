import React from 'react';

interface IProps {
  name: string;
  students: Array<string>;
}

const ClassCard = (props: IProps) => {
  const { name, students } = props;

  return (
    <div className="class-card-con">
      <div className="class-name">
        <h3>Name</h3>
        <p>{name}</p>
      </div>

      <div className="students">
        <h3>Students</h3>
        <p>{students.join(', ')}</p>
      </div>
    </div>
  );
};

export default ClassCard;
