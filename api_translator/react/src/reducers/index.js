import { combineReducers } from 'redux';

import activeSentence from './activeSentence.js';
import activeWord from './activeWord.js';
import activeTool from './activeTool.js';
import isAuth from './isAuth.js'
import isLoading from './isLoading.js'
import notis from './notis.js'

import active from './active.js'
import sentences from './sentences.js'
export const reducers = combineReducers({ active, sentences, isAuth, notis, isLoading });