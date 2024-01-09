// eslint-disable-next-line react/prop-types
const TabContent = ({ id, activeTab, children }) => {
  return activeTab === id ? <div className="TabContent">{children}</div> : null;
};

export default TabContent;
