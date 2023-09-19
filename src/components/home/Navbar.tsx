import { Dispatch, SetStateAction } from "react";
import { FaCamera, FaSearch } from "react-icons/fa";
type Props = {
  setTag: Dispatch<SetStateAction<string>>;
  tag:string;
};
export default function Navbar({ setTag,tag }: Props) {
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    setTag(e.target.value);
  }
 
 
  return (
    <nav className="navbar bg-neutral fixed top-0 w-full !px-[2.5%] left-0 z-[10] py-4 justify-between">
      <div className="">
        <a className="normal-case text-xl">Photos</a>
      </div>
      <div className="flex items-center gap-5">
        <div className="form-control w-[50vw] sm:w-[70vw] max-w-[300px] lg:max-w-none relative flex-shrink-0">
          <button
            type="button"
            className="absolute left-3 z-[3] inset-y-0 my-auto text-gray-300 cursor-pointer"
          >
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search by Tags"
            onChange={handleChange}
            value={tag}
            id="search"
            className="input input-bordered w-full pl-[2.2rem]"
          />
        </div>
        <button className="hidden sm:block shadow-[1px_0px_25px_rgba(255,255,255,0.5)_,_0_1px_18px_rgba(255,255,255,0.23)] bg-transparent rounded-full">
          <FaCamera size="26" />
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-white border object-contain">
              <img src="https://i.pravatar.cc/300" alt="profile image" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1]  p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
