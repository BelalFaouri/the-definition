import $ from 'jquery'
import Head from 'next/head'

class Index extends React.Component {
  constructor(props){
    super(props)

    this.state={
      input:'',
      meaning:''
    }
    this.fetchMeaning=this.fetchMeaning.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }
  handleChange(event){
    this.setState({input: event.target.value});
  }
  async fetchMeaning(){
    const {input}=this.state;

    const that=this;
    $.ajax({
      url: "/word",
      type: "get",
      data: {
        input: input,
      },
      success: function(response) {
        const meaning =response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
        that.setState({meaning:meaning})
      },
      error: function(xhr) {
        console.error(xhr);
      }
    });

  }
  render(){
    return(
      <div>
        <Head>
          <title>The Definition</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>
        </Head>
        <div className='flex-container'>
          <div className='app-body'>
            <h2>Insert a word below: </h2>
            <div>
              <input onChange={this.handleChange} placeholder='Type a word here..'></input>
              <button onClick={this.fetchMeaning}>Get Definition</button>
            </div>
            <textarea rows="4" cols="33" value={this.state.meaning}></textarea>
          </div>
          </div>
          <style jsx>{`
              .flex-container{
                text-align: center;
                min-height: 100vh;
                background-color: #ADD8E6;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: calc(10px + 2vmin);
                justify-content: center;

              }
              h2{
                text-align:left;
                padding:20px;
              }
              .app-body{
                border:solid;
              }
              textarea {
                padding: 10px;
                line-height: 1.5;
                border-radius: 5px;
                border: 1px solid #ccc;
                box-shadow: 1px 1px 1px #999;
            }

              `}</style>
      </div>
    )
  }
}


export default Index
