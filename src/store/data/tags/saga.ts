import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  createTag,
  deleteTag,
  fetchAllTags,
  loadTag,
  loadTags,
  updateTag,
} from './slice';
import { Tag } from './types';
import { getTagRequest } from './utils';
import api from '../../../api';

function* executeCreateTag({ payload: tag }: PayloadAction<Tag>) {
  yield put(getTagRequest(tag, 'create', 'loading'));
  try {
    const response: Tag = yield call(api.tag.createTag, tag);
    yield put(getTagRequest(tag, 'create', 'loaded'));
    yield put(loadTag(response));
  } catch {
    yield put(getTagRequest(tag, 'create', 'error'));
  }
}

function* executeUpdateTag({ payload: tag }: PayloadAction<Tag>) {
  yield put(getTagRequest(tag, 'update', 'loading'));

  try {
    const response: Tag = yield call(api.tag.updateTag, tag);
    yield put(loadTag(response));
    yield put(getTagRequest(tag, 'update', 'loaded'));
  } catch {
    yield put(getTagRequest(tag, 'update', 'error'));
  }
}

function* executeDeleteTag({ payload: tag }: PayloadAction<Tag>) {
  yield put(getTagRequest(tag, 'delete', 'loading'));

  try {
    yield call(api.tag.deleteTag, tag);
    yield put(getTagRequest(tag, 'delete', 'loaded'));
  } catch {
    yield put(getTagRequest(tag, 'delete', 'error'));
  }
}

function* executeFetchAllTags() {
  yield put(getTagRequest(null, 'retrieve', 'loading'));

  try {
    const response: Tag[] = yield call(api.tag.receiveTags);
    yield put(loadTags(response));
    yield put(getTagRequest(null, 'retrieve', 'loaded'));
  } catch {
    yield put(getTagRequest(null, 'retrieve', 'error'));
  }
}

export default function* tagSaga() {
  yield takeEvery(createTag.type, executeCreateTag);
  yield takeEvery(updateTag.type, executeUpdateTag);
  yield takeEvery(deleteTag.type, executeDeleteTag);
  yield takeEvery(fetchAllTags.type, executeFetchAllTags);
}
