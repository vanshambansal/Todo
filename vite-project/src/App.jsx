import { useState } from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Todostate, filteredTodoListState, todoListFilterState, todoListStatsState } from './todoatoms'
import './App.css'


function App() {
  return (
    <div>
      <RecoilRoot>
        <Appcontent />
      </RecoilRoot>
    </div>
  )
}


function Appcontent() {
  const todoliststate = useRecoilValue(filteredTodoListState)

  return (
    <div>
      <Todocreater />
      <TodoListStats />
      <TodoListFilters />
      {todoliststate.map((todoitem) => (<Todoitem key={todoitem.id} item={todoitem}></Todoitem>))}

    </div>
  )
}
function Todocreater() {
  const [todolist, settodolist] = useState("")
  const settodoliststate = useSetRecoilState(Todostate)

  const additem = () => {
    settodoliststate((oldlist) => [...oldlist
      , {
      id: getid(),
      text: todolist,
      isComplete: false
    }
    ])
    settodolist("")
  }



  const onChange = (e) => {
    const value = e.target.value
    settodolist(value)
  }

  return (
    <div>
      <input type="text" value={todolist} onChange={onChange} />
      <button onClick={additem}>ADD</button>
    </div>
  )

}

let id = 0
function getid() {
  return id++
}

function Todoitem({ item }) {

  const [todoliststate, settodoliststate] = useRecoilState(Todostate)
  const index = todoliststate.findIndex((listitem) => listitem === item)

  const edititemtext = ({ target: { value } }) => {

    const newlist = replaceItemAtIndex(todoliststate, index, {
      ...item,
      text: value,
    })
    settodoliststate(newlist)
  }

  const toggleitemcompletion = () => {
    const newlist = replaceItemAtIndex(todoliststate, index, {
      ...item,
      isComplete: !item.isComplete
    })
    settodoliststate(newlist)
  }

  const deleteitem = () => {
    const newlist = removeItemAtIndex(todoliststate, index)
    settodoliststate(newlist)
  }

  return (
    <div>
      <input type="text" value={item.text} onChange={edititemtext} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleitemcompletion}
      />
      <button onClick={deleteitem}>DELETE</button>

    </div>
  )

}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}



function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter :
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

export default App
