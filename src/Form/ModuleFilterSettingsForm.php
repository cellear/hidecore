<?php

namespace Drupal\hidecore\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Settings form for Module Filter.
 */
class ModuleFilterSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'hidecore_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('hidecore.settings');
    $form = parent::buildForm($form, $form_state);

    $form['modules'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Extend'),
      '#description' => $this->t('These are settings pertaining to the Extend pages of the site.'),
      '#collapsible' => FALSE,
    ];
    $form['modules']['tabs'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enhance the Extend page with tabs'),
      '#description' => $this->t('Provides many enhancements to the Extend page including the use of tabs for packages.'),
      '#default_value' => $config->get('tabs'),
    ];

    $form['modules']['path'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show module path in modules list'),
      '#description' => $this->t('Defines if the relative path of each module will be display in its row.'),
      '#default_value' => $config->get('path'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $this->config('hidecore.settings')
      ->set('tabs', $values['tabs'])
      ->set('path', $values['path'])
      ->save();

    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['hidecore.settings'];
  }

}
