<?php

namespace Drupal\hidecore\Controller;

use Drupal\update\Controller\UpdateController;

/**
 * A wrapper controller for injecting the filter into the update status page.
 */
class ModuleFilterUpdateController extends UpdateController {

  /**
   * {@inheritdoc}
   */
//  public function updateStatus() {
//    $build = [
//      '#type' => 'container',
//      '#attributes' => [
//        'id' => 'update-status',
//      ],
//    ];
//    $build['hidecore'] = $this->formBuilder()->getForm('Drupal\hidecore\Form\ModuleFilterUpdateStatusForm');
//    $build['update_report'] = parent::updateStatus();
//    return $build;
//  }

}
