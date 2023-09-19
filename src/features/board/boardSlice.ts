import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';

export interface BoardState {
 images: {
  id: string;
  url: string;
  tag:string;
 }[],
 hasChanged: boolean;
 originalIndexes: Record<string,number>
}

const initialState: BoardState = {
  images: [
    {
      id: 'Image-1',
     tag: 'Beach',
      url: "https://images.unsplash.com/photo-1687360440984-3a0d7cfde903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }, {
      id: 'Image-2',
      tag: "Technology",
      url: "https://images.unsplash.com/photo-1468851508491-4f854ec88aa0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=b1222b6a1d3694cac76d2a23c3a02254"
    }, {
      id: 'Image-3',
      tag: "Art",
      url: "https://images.unsplash.com/photo-1454991727061-be514eae86f7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=3c55430f01fe9ac9a9ccb3383d1416ff"
    }, {
      id: 'Image-4',
      tag: "Travel",
      url: "https://images.unsplash.com/photo-1467890947394-8171244e5410?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9396f0adf263b51b44626228225684d0"
    }, {
      id: 'Image-5',
      tag: "Food",
      url: "https://images.unsplash.com/photo-1443302382600-0bfacc473376?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=0c0f26518c1001f67b6c2e4480a8d3e0"
    }, {
      id: 'Image-6',
      tag: "Nature",
      url: "https://images.unsplash.com/photo-1429091443922-e7d9ae79a837?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=e81cb6a60c53788559edb9bec21b80fc"
    }, {
      id: 'Image-7',
      tag: "Fire",
      url: "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=1f57cc13084e32839627453821a43abf"
    }, {
      id: 'Image-8',
      tag: "Garden",
      url: "https://images.unsplash.com/photo-1427392797425-39090deb14ec?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=8bfe49466d0da200e61128a8ab0e8fbe"
    }, {
      id: 'Image-9',
      tag: "Bridge",
      url: "https://images.unsplash.com/photo-1445723356089-6dbb51d9c4f8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=6e476c6e7ce1adac161295616d1bec05"
    },
    {
      id: 'Image-10',
      tag: "Mountains",
      url: "https://images.unsplash.com/photo-1694802519363-42c4067833c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 'Image-11',
      tag: "City",
      url: "https://images.unsplash.com/photo-1694980549496-8aff1f4d16c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }, 
    {
      id: 'Image-12',
      tag: "Sports",
      url: "https://images.unsplash.com/photo-1666623597717-69932c99f078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZjF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    }
  ],
  originalIndexes:{},
  hasChanged:false
}

type moveAction = {
  payload : {
    from: number;
    to: number;
  },
  type: string
}
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    moveImage: (state,action:moveAction) =>{
      // has a from and to in the payload updates the array arrangement and originalIndexes.
    const {from, to} = action.payload
    
    const imageCopy = state.images.slice();
    const updatedOriginalIndexes = { ...state.originalIndexes };
    const itemIdFrom = imageCopy[from].id;
    const itemIdTo = imageCopy[to].id;
    updatedOriginalIndexes[itemIdFrom] = to;
    updatedOriginalIndexes[itemIdTo] = from;
    
    const temp = imageCopy[to]; 
    imageCopy[to] = imageCopy[from]; 
    imageCopy[from] = temp;
    
    
      
       
       state.images = [...imageCopy];
      state.originalIndexes = updatedOriginalIndexes;
    },
    addImage: () => {

    },
    deleteImage : () => {

    },
    saveImages: () => {

    },
    setIndexes : (state) => {
      const originalIndexesCopy : Record<string, number> = {}
      state.images.forEach((image,index)=>{
        originalIndexesCopy[image.id] =index;
      })
      state.originalIndexes = originalIndexesCopy;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addImage,deleteImage,moveImage,saveImages, setIndexes } = boardSlice.actions
export const selectBoard = (state: RootState) => state.board
export default boardSlice.reducer