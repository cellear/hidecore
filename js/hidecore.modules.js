/**
 * @file
 * Module filter behaviors.
 */

(function($, Drupal) {

  'use strict';

  Drupal.ModuleFilter = Drupal.ModuleFilter || {};
  var ModuleFilter = Drupal.ModuleFilter;

  /**
   * Filter enhancements.
   */
  Drupal.behaviors.moduleFilterModules = {
    attach: function(context, settings) {
      var $input = $('input.table-filter-text', context).once('module-filter');
      if ($input.length) {
        ModuleFilter.input = $input;
        ModuleFilter.selector = 'tbody tr';
        ModuleFilter.wrapperId = ModuleFilter.input.attr('data-table');
        ModuleFilter.wrapper = $(ModuleFilter.wrapperId);


        ModuleFilter.wrapper.children('details').wrapAll('<div class="modules-wrapper"></div>');
        ModuleFilter.modulesWrapper = $('.modules-wrapper', ModuleFilter.wrapper);

        ModuleFilter.input.winnow(ModuleFilter.wrapperId + ' ' + ModuleFilter.selector, {
          textSelector: 'td.module .module-name, .module-machine-name',
          emptyMessage: Drupal.t('No results'),
          clearLabel: Drupal.t('clear'),
          wrapper: ModuleFilter.modulesWrapper,
          buildIndex: [
            function(item) {
              var $checkbox = $('td.checkbox :checkbox', item.element);
              if ($checkbox.length > 0) {
                item.status = $checkbox.is(':checked');
                item.disabled = $checkbox.is(':disabled');
              }
              else {
                item.status = false;
                item.disabled = true;
              }
              return item;
            }
          ],
          additionalOperators: {
            description: function(string, item) {
              if (item.description == undefined) {
                // Soft cache.
                item.description = $('.module-description', item.element).text().toLowerCase();
              }

              if (item.description.indexOf(string) >= 0) {
                return true;
              }
            },
            requiredBy: function(string, item) {
              if (item.requiredBy === undefined) {
                // Soft cache.
                item.requiredBy = [];
                $('.admin-requirements.required-by li', item.element).each(function() {
                  var moduleName = $(this)
                    .text()
                    .toLowerCase()
                    .replace(/\([a-z]*\)/g, '');
                  item.requiredBy.push($.trim(moduleName));
                });
              }

              if (item.requiredBy.length) {
                for (var i in item.requiredBy) {
                  if (item.requiredBy[i].indexOf(string) >= 0) {
                    return true;
                  }
                }
              }
            },
            requires: function(string, item) {
              if (item.requires === undefined) {
                // Soft cache.
                item.requires = [];
                $('.admin-requirements.requires li', item.element).each(function() {
                  var moduleName = $(this)
                    .text()
                    .toLowerCase()
                    .replace(/\([a-z]*\)/g, '');
                  item.requires.push($.trim(moduleName));
                });
              }

              if (item.requires.length) {
                for (var i in item.requires) {
                  if (item.requires[i].indexOf(string) >= 0) {
                    return true;
                  }
                }
              }
            }
          },
          rules: [
            function(item) {


              return false;
            }
          ]
        }).focus();
        ModuleFilter.winnow = ModuleFilter.input.data('winnow');

        var $details = ModuleFilter.modulesWrapper.children('details');
        ModuleFilter.input.bind('winnow:finish', function() {
          Drupal.announce(
            Drupal.formatPlural(
              ModuleFilter.modulesWrapper.find(ModuleFilter.selector + ':visible').length,
              '1 module is available in the modified list.',
              '@count modules are available in the modified list.'
            )
          );
        });


      }
    }
  };

})(jQuery, Drupal);
