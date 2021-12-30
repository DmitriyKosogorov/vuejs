Vue.component('todo-item', {
  props: ['todo'],
  template: '<tr><td>{{ todo.id }}</td><td>{{ todo.name }}</td><td>{{ todo.completed }}</td><td><button>del</button></td></tr>'
})

var table = new Vue({
  el: '#table',
  data: {
    todolist: [
      { id: 0, name: 'Проснуться',importance: 'очень важно', time:'Утро', compleated: true },
      { id: 1, name: 'Встать',importance: 'не очень важно', time:'Утро', compleated: false },
      { id: 2, name: 'Умыться',importance: 'вообще не важно', time:'День', compleated: false }
    ],
	saveid: 3,
	taskName: "",
	isadded: true,
	selected: "важно",
	picked: "undone",
	taskTime:[],
	EditId: 0
  },
  mounted() {
    if (localStorage.getItem('todolist')) {
      try {
        this.todolist = JSON.parse(localStorage.getItem('todolist'));
      } catch(e) {
        localStorage.removeItem('todolist');
      }
    }
	
	if (localStorage.saveid) {
      this.saveid = localStorage.saveid;
    }
  },
  methods:{
	  addOne(){
		  donder=false;
		  if(this.picked==="done")
			  donder=true;
		  timer="";
		  strtimer="";
		  for(i in this.taskTime)
		  {
			  strtimer=strtimer+' '+this.taskTime[i];
		  }
		  if(strtimer===' Утро')
			  timer="Утро";
		  else
		  if(strtimer===' Утро День')
			  timer="Утро–День";
		  else
		  if(strtimer===' Утро День Вечер')
			  timer="Утро–Вечер";
		  else
		  if(strtimer===' Утро Вечер')
			  timer="Утро,Вечер";
		  else
		  if(strtimer===' День')
			  timer="День";
		  else
	      if(strtimer===' Вечер')
			  timer="Вечер";
		  else
			  timer="Ошибка времени";
		  if(this.taskName==='')
			  this.taskName='(Пусто)'
		  this.todolist.push({id: this.saveid, name: this.taskName, importance: this.selected, time: timer, compleated: donder});
		  this.saveid++;
		  localStorage.saveid = this.saveid;
		  const parsed = JSON.stringify(this.todolist);
		  localStorage.setItem('todolist', parsed);
	  },
	  del(idshnik){
		  if(this.todolist.length>1)
		  {
			  for(i=0;i<(this.todolist.length);i++)
			  {
				  if(this.todolist[i].id===idshnik)
				  {
					this.todolist.splice(idshnik, i);					  
				  }
			  }

			  const parsed = JSON.stringify(this.todolist);
			  localStorage.setItem('todolist', parsed);
		  }
	  },
	  doneTask(idshnik){
		  if(this.todolist[idshnik].compleated==false)
			this.todolist[idshnik].compleated=true
		  else
			  this.todolist[idshnik].compleated=false
	  },
	  editTask(idshnik)
	  {
		  this.isadded=false;
		  //EditId=idshnik;
		  if(this.todolist[idshnik].name==='(Пусто)')
			this.taskName='';
		  else
			this.taskName=this.todolist[idshnik].name;
		  this.saveid = 3;
		  this.selected = this.todolist[idshnik].importance;
		  if(this.todolist[idshnik].compleated===true)
			this.picked = "done";
		  else
			this.picked = "undone"; 
		  timer=[];
		  if(this.todolist[idshnik].time==='Утро')
			  timer=['Утро'];
		  else
		  if(this.todolist[idshnik].time==='День')
			  timer=['День'];
		  else
		  if(this.todolist[idshnik].time==='Вечер')
			  timer=['Вечер'];
		  else
		  if(this.todolist[idshnik].time==='Утро–День')
			  timer=['Утро','День'];
		  else
		  if(this.todolist[idshnik].time==='Утро–Вечер')
			  timer=['Утро','День','Вечер'];
		  else
		  if(this.todolist[idshnik].time==='День–Вечер')
			  timer=['День','Вечер'];
		  //console.log(this.todolist[idshnik].time==='Утро');
		  this.taskTime=timer;
		  this.EditId= idshnik;
	  },
	  saveChanges(idshnik){
		  if(this.taskName==='')
			  this.todolist[idshnik].name='(Пусто)';
		  else
			  this.todolist[idshnik].name=this.taskName;
		  this.todolist[idshnik].importance=this.selected;
		  timer="";
		  strtimer="";
		  for(i in this.taskTime)
		  {
			  strtimer=strtimer+' '+this.taskTime[i];
		  }
		  if(strtimer===' Утро')
			  timer="Утро";
		  else
		  if(strtimer===' Утро День')
			  timer="Утро–День";
		  else
		  if(strtimer===' Утро День Вечер')
			  timer="Утро–Вечер";
		  else
		  if(strtimer===' Утро Вечер')
			  timer="Утро,Вечер";
		  else
		  if(strtimer===' День')
			  timer="День";
		  else
	      if(strtimer===' Вечер')
			  timer="Вечер";
		  else
			  timer="Ошибка времени";
		  this.todolist[idshnik].time=timer;
		  this.todolist[idshnik].compleated=this.picked;
		  const parsed = JSON.stringify(this.todolist);
		  localStorage.setItem('todolist', parsed);
	  },
	  cancel(){
			this.isadded=true;
		  	this.saveid = 0;
			this.taskName = "";
			this.isadded = true;
			this.selected = "важно";
			this.picked = "undone";
			this.taskTime=[];
			this.EditId= 0;
	  },
	  emptyLocalStorage(){
		  console.log(this.EditId);
		  //localStorage.removeItem('todolist');
		  //localStorage.removeItem('saveid');
	  }
  }
})