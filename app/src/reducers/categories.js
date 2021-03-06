const initialState = [];


export default function categories (state = initialState, action) {
    switch (action.type) {
      case "LOAD_CATEGORIES_ALL":
        return action.payload; 
      case "LOAD_CATEGORIES_SUCCESS":
        return [
          ...state,
          action.payload
        ];  
      case "ADD_CATEGORY":
        return [
          ...state,
          action.payload.dataload
        ];   
      case "EDIT_CATEGORY": 
        // проходим по основному state
        const updatedRootItems = state.map(item => {
          if(item.idCategories === action.payload.dataload.idCategories){
            return {...item, ...action.payload.dataload};
          }
          return item;
        });
    
        return updatedRootItems;

        case "DELETE_CATEGORY": 
          return state.filter(category => category.idCategories !== action.payload.idCategories );
      default:
        return state;
    }
}