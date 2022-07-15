'use strict';
import data from './data.js';

window.addEventListener('DOMContentLoaded', ()=> {
  /* Variables */
  const $btnDaily =  document.getElementById('btn-daily');
  const $btnWeekly =  document.getElementById('btn-weekly');
  const $btnMonthly =  document.getElementById('btn-monthly');
  
  const cards = [];
  const stat = {
    current: 'daily',
    novel: null
  }
  const statSelection = {
    current: $btnDaily,
    pressed: null
  }

  /* Functions */
  class ErrorValidacion extends Error{
    constructor(message,name){
      super(message);
      this.name = 'Validate Stat';
    }
  }

  function getSelectorsOfCards(data,cards) {
    data.map((item, index)=> {
      const itemCurrent = {
        title: item.title,
        elementsHTML: {
          current: document.querySelector(`.c-card:nth-child(${index+1}) .current`),
          previous: document.querySelector(`.c-card:nth-child(${index+1}) .previous`),
          stat: document.querySelector(`.c-card:nth-child(${index+1}) .stat`)
        }
      }
      cards.push(itemCurrent);
    });
  }

  function renderDataOfHoursInCards(data, cards, stat) {
    data.map((item,index)=>{
      cards[index].elementsHTML.current.textContent = item.timeframes[stat].current;
      cards[index].elementsHTML.previous.textContent = item.timeframes[stat].previous;
      cards[index].elementsHTML.stat.textContent = stat;
    });
  }

  function changeStylesButtonsUser(statSelection){
    statSelection.current.classList.toggle('is-selected');
    statSelection.pressed.classList.toggle('is-selected');
    statSelection.current.disabled = false;
    statSelection.pressed.disabled = true;
  }

  function validateValueOfTheButtonPressed({current, novel}) {
    if(current === novel)
      throw new ErrorValidacion('Removed "disabled" property from current stat button');
  }

  function changeCurrentStat(stat) {
    stat.current = stat.novel;
  }

  function changeCurrentStatSelection(statSelection) {
    statSelection.current = statSelection.pressed;
  }

  function setValuesInTheGlobalObjects(stat,statSelection,$buttonPressed){
    statSelection.pressed = $buttonPressed;
    stat.novel = $buttonPressed.textContent.toLowerCase();
  }

  function handlePressedButton(stat, statSelection, $buttonPressed) {
    try {
      setValuesInTheGlobalObjects(stat, statSelection, $buttonPressed);
      validateValueOfTheButtonPressed(stat,statSelection);
      changeCurrentStat(stat);
      changeStylesButtonsUser(statSelection);
      changeCurrentStatSelection(statSelection);
      renderDataOfHoursInCards(data,cards,stat.current);
    } catch (error) {
      console.warn(error);
    }
  }

  /* Code Execution */
  getSelectorsOfCards(data,cards);
  renderDataOfHoursInCards(data, cards, stat.current);

  document.addEventListener('click', (e)=> {
    if(e.target.matches(`#${$btnDaily.id}`)){
      handlePressedButton(stat, statSelection,$btnDaily);
    }
    if(e.target.matches(`#${$btnWeekly.id}`)){
      handlePressedButton(stat, statSelection,$btnWeekly);
    }
    if(e.target.matches(`#${$btnMonthly.id}`)){
      handlePressedButton(stat, statSelection,$btnMonthly);
    }
  });

  document.addEventListener('keypress', (e)=> {
    if(e.target.matches(`#${$btnDaily.id}`)){
      handlePressedButton(stat, statSelection,$btnDaily);
    }
    if(e.target.matches(`#${$btnWeekly.id}`)){
      handlePressedButton(stat, statSelection,$btnWeekly);
    }
    if(e.target.matches(`#${$btnMonthly.id}`)){
      handlePressedButton(stat, statSelection,$btnMonthly);
    }
  });

  document.addEventListener('touchend', (e)=> {
    if(e.target.matches(`#${$btnDaily.id}`)){
      handlePressedButton(stat, statSelection,$btnDaily);
    }
    if(e.target.matches(`#${$btnWeekly.id}`)){
      handlePressedButton(stat, statSelection,$btnWeekly);
    }
    if(e.target.matches(`#${$btnMonthly.id}`)){
      handlePressedButton(stat, statSelection,$btnMonthly);
    }
  });
});