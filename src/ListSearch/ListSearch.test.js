import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListSearch from './ListSearch';
import Card from '@material-ui/core/Card';

Enzyme.configure({ adapter: new Adapter() });

describe('ListSearch component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ListSearch />);
    expect(wrapper.exists()).toBe(true);
  });

  describe('and has no results to display', () => {
    const items = [];
    it('should display no result info', () => {
      const wrapper = shallow(<ListSearch items={items} searchAlbum={true} />);
      const wrapper2 = shallow(<ListSearch items={items} searchAlbum={false} />);
      expect(wrapper.find(".no-results-info").length).toBe(1);
      expect(wrapper2.find(".no-results-info").length).toBe(1);
    });
  });

  describe('and has results to display', () => {
    const items = [
      {
        "artistName":"Artist",
        "collectionCensoredName":"Album", 
        "collectionViewUrl":"Link", 
        "artworkUrl100":"Image", 
      }, 
      {
        "artistName":"Artist",
        "collectionCensoredName":"Album", 
        "collectionViewUrl":"Link", 
        "artworkUrl100":"Image", 
      }, 
    ];

    it('should display result info', () => {
      const wrapper = shallow(<ListSearch items={items} searchAlbum={true} />);
      const wrapper2 = shallow(<ListSearch items={items} searchAlbum={false} />);
      expect(wrapper.find(".results-div").length).toBe(1);
      expect(wrapper2.find(".results-div").length).toBe(1);
    });

    it('should have equal quantity of cards and results', () => {
      const wrapper = shallow(<ListSearch items={items} searchAlbum={true} />);
      const wrapper2 = shallow(<ListSearch items={items} searchAlbum={false} />);
      expect(wrapper.find(Card).length).toBe(2);
      expect(wrapper2.find(Card).length).toBe(2);
    });
  });
  
});