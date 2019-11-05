import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
  
  it('has a search box', () => {
    const wrapper = mount(<App />);
    const searchBox = wrapper.find("input#search-text");
    expect(searchBox.length).toBe(1);
  });
  
  it('has a search button', () => {
    const wrapper = mount(<App />);
    const searchBtn = wrapper.find("button#search-btn");
    expect(searchBtn.length).toBe(1);
  });
  
  it('has a search type switch', () => {
    const wrapper = mount(<App />);
    const searchSwitch = wrapper.find("input#search-type");
    expect(searchSwitch.length).toBe(1);
  });
  
  it('has a footer', () => {
    const wrapper = mount(<App />);
    const footer = wrapper.find("footer");
    expect(footer.length).toBe(1);
  });

  it('should have the album search enabled by default', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('input#search-type').prop('checked')).toBeTruthy();
  });
});