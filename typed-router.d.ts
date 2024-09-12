/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    'root': RouteRecordInfo<'root', '/', Record<never, never>, Record<never, never>>,
    'account': RouteRecordInfo<'account', '/account', Record<never, never>, Record<never, never>>,
    'account-profile': RouteRecordInfo<'account-profile', '/account/profile', Record<never, never>, Record<never, never>>,
    'account-setting-security': RouteRecordInfo<'account-setting-security', '/account/setting-security', Record<never, never>, Record<never, never>>,
    'activity': RouteRecordInfo<'activity', '/activity', Record<never, never>, Record<never, never>>,
    'activity-id': RouteRecordInfo<'activity-id', '/activity/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'booking': RouteRecordInfo<'booking', '/booking', Record<never, never>, Record<never, never>>,
    'booking-id': RouteRecordInfo<'booking-id', '/booking/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'privacy-policy': RouteRecordInfo<'privacy-policy', '/privacy-policy', Record<never, never>, Record<never, never>>,
    'term-conditions': RouteRecordInfo<'term-conditions', '/term-conditions', Record<never, never>, Record<never, never>>,
    'venue': RouteRecordInfo<'venue', '/venue', Record<never, never>, Record<never, never>>,
    'venue-id': RouteRecordInfo<'venue-id', '/venue/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'venue-field-id': RouteRecordInfo<'venue-field-id', '/venue/field/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    'venue-payment': RouteRecordInfo<'venue-payment', '/venue/payment', Record<never, never>, Record<never, never>>,
  }
}
