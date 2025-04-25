import React from 'react';
import './AccordionView.scss';

interface AccordionViewProps {
  title: string;
  children: React.ReactNode;
}

const AccordionView: React.FC<AccordionViewProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-view">
      <div className="accordion-view__title" onClick={handleToggle}>
        <h2>{title}</h2>
        <span className={`accordion-view__icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="accordion-view__content">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionView;
