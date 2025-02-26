import { atom, selector } from "recoil";

export const Todostate= atom({
    key:"todostate",
    default:[]

})
export const todoListFilterState = atom({
    key: 'TodoListFilter',
    default: 'Show All',
  });


export const filteredTodoListState = selector({
    key: 'FilteredTodoList',
    get: ({get}) => {
      const filter = get(todoListFilterState);
      const list = get(Todostate);
  
      switch (filter) {
        case 'Show Completed':
          return list.filter((item) => item.isComplete);
        case 'Show Uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    },
  });

export const todoListStatsState = selector({
    key: 'TodoListStats',
    get: ({get}) => {
      const todoList = get(Todostate);
      const totalNum = todoList.length;
      const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
      const totalUncompletedNum = totalNum - totalCompletedNum;
      const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;
  
      return {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
      };
    },
  });